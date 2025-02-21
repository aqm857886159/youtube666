import json
import os
from datetime import datetime

class Database:
    def __init__(self, db_path=None):
        if db_path is None:
            current_dir = os.path.dirname(os.path.abspath(__file__))
            self.db_path = os.path.join(current_dir, 'futures_reports.json')
        else:
            self.db_path = db_path
            
        # 确保数据文件存在
        if not os.path.exists(self.db_path):
            self._save_data({'reports': []})
    
    def _load_data(self):
        try:
            with open(self.db_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return {'reports': []}
    
    def _save_data(self, data):
        with open(self.db_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    
    def save_strategy(self, variety, strategy):
        data = self._load_data()
        data['reports'].append({
            'variety': variety,
            'strategy': strategy,
            'date': datetime.now().strftime('%Y-%m-%d')
        })
        self._save_data(data)
    
    def get_latest_reports(self):
        data = self._load_data()
        if not data['reports']:
            return []
            
        # 获取最新日期
        latest_date = max(report['date'] for report in data['reports'])
        
        # 返回最新日期的报告
        latest_reports = [
            (report['variety'], report['strategy'], report['date'])
            for report in data['reports']
            if report['date'] == latest_date
        ]
        return latest_reports
    
    def close(self):
        # JSON 文件不需要关闭连接
        pass 