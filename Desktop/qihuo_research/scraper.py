from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import time
from database import Database

class FuturesReportScraper:
    def __init__(self, chrome_driver_path):
        self.service = Service(chrome_driver_path)
        self.driver = None
        self.db = Database()
        
        self.varieties = [
            "烧碱", "纯碱", "玻璃", "锰硅", "硅铁", "工业硅", "多晶硅", "碳酸锂", "焦煤", "焦炭",
            "铁矿石", "螺纹", "热卷", "不锈钢", "镍", "铝", "氧化铝", "锌", "铅", "白银",
            "尿素", "甲醇", "PTA", "短纤", "瓶片", "苯乙烯", "塑料", "聚丙烯",
            "PVC", "液化石油气", "原木", "纸浆", "沥青", "燃料油", "低硫燃料油", "合成橡胶", "橡胶",
            "20号胶", "棉花", "花生", "白糖", "苹果", "红枣", "菜粕", "菜油", "棕榈油", "豆油",
            "豆粕", "豆一", "豆二", "玉米", "淀粉", "鸡蛋", "集运欧线"
        ]
        
    def start_browser(self):
        self.driver = webdriver.Chrome(service=self.service)
        self.driver.get('https://fxq.founderfu.com:8081/fangzheng-forward/qiweih5/#/?str=%22%22')
        time.sleep(10)  # 等待页面初始加载
        
    def scrape_variety(self, variety, max_retries=3):
        for attempt in range(max_retries):
            try:
                variety_button = WebDriverWait(self.driver, 20).until(
                    EC.element_to_be_clickable((By.XPATH, 
                        f'//uni-view[contains(@class, "item-prod") and contains(text(), "{variety}")]'))
                )
                self.driver.execute_script("arguments[0].scrollIntoView();", variety_button)
                self.driver.execute_script("arguments[0].click();", variety_button)
                print(f"已点击{variety}")
                time.sleep(3)

                strategy = WebDriverWait(self.driver, 20).until(
                    EC.presence_of_element_located(
                        (By.XPATH, '//uni-view[@style="padding: 0px 16px; line-height: 26px;"]'))
                ).text

                if not strategy.strip():  # 检查策略内容是否为空
                    print(f"警告：{variety} 的策略内容为空")
                    return False

                self.db.save_strategy(variety, strategy)
                print(f"{variety} 的交易策略已保存")

                self.driver.back()
                time.sleep(3)
                return True
                
            except Exception as e:
                print(f"处理{variety}时出错: {e}")
                if attempt == max_retries - 1:
                    return False
                continue
    
    def scrape_all(self):
        try:
            self.start_browser()
            for variety in self.varieties:
                self.scrape_variety(variety)
        finally:
            if self.driver:
                self.driver.quit()
            self.db.close() 