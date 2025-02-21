import tkinter as tk
from tkinter import ttk, messagebox
from datetime import datetime
from scraper import FuturesReportScraper
from database import Database
import threading

class FuturesReportGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("期货研报阅读器")
        self.root.geometry("1200x800")
        
        # 设置整体背景色为深色
        self.root.configure(bg='#1E1E1E')
        
        # 设置整体样式
        style = ttk.Style()
        style.theme_use('clam')
        
        # 配置按钮样式
        style.configure("Action.TButton",
                        font=('Helvetica Neue', 12),
                        padding=(10, 5),
                        background='#007AFF',  # 使用苹果蓝色
                        foreground='#FFFFFF',  # 白色文字
                        borderwidth=0,
                        relief='flat')  # 平面风格
        
        style.map('Action.TButton',
                  background=[('active', '#005BB5')],  # 鼠标悬停时变为深蓝
                  foreground=[('active', '#FFFFFF')])  # 文字保持白色
        
        # 创建主框架
        self.main_frame = ttk.Frame(root, padding="30", style='Custom.TFrame')
        self.main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # 创建标题区域
        title_frame = ttk.Frame(self.main_frame, style='Title.TFrame')
        title_frame.grid(row=0, column=0, sticky=(tk.W, tk.E), pady=(0, 25))
        
        # 创建标题文本区域
        title_text_frame = ttk.Frame(title_frame, style='TitleText.TFrame')
        title_text_frame.grid(row=0, column=0, sticky=(tk.W))
        
        title_label = ttk.Label(
            title_text_frame,
            text="期货研报",
            font=('Helvetica Neue', 48),  # 增大标题字体
            foreground='#FFFFFF',
            background='#1E1E1E'
        )
        title_label.grid(row=0, column=0, sticky=tk.W)
        
        title_label_2 = ttk.Label(
            title_text_frame,
            text="阅读器",
            font=('Helvetica Neue', 48, 'bold'),  # 增大副标题字体
            foreground='#007AFF',
            background='#1E1E1E'
        )
        title_label_2.grid(row=0, column=1, sticky=tk.W)
        
        subtitle_label = ttk.Label(
            title_text_frame,
            text="实时获取期货市场最新研究策略",
            font=('Helvetica Neue', 16),  # 增大副标题字体
            foreground='#B0B0B0',
            background='#1E1E1E'
        )
        subtitle_label.grid(row=1, column=0, columnspan=2, sticky=tk.W, pady=(5, 0))
        
        # 添加分隔线
        separator = ttk.Separator(self.main_frame, orient='horizontal')
        separator.grid(row=1, column=0, sticky=(tk.W, tk.E), pady=(0, 25))
        
        # 创建控制按钮面板
        control_frame = ttk.Frame(self.main_frame, style='Custom.TFrame')
        control_frame.grid(row=2, column=0, pady=(0, 25))
        
        # 创建按钮容器
        button_container = ttk.Frame(control_frame, style='Custom.TFrame')
        button_container.grid(row=0, column=0, padx=20, pady=10)
        
        update_btn = ttk.Button(
            button_container, 
            text="↻  更新报告", 
            command=self.start_scraping,
            style="Action.TButton"
        )
        update_btn.grid(row=0, column=0, padx=8)
        
        refresh_btn = ttk.Button(
            button_container, 
            text="⟳  刷新显示", 
            command=self.load_reports,
            style="Action.TButton"
        )
        refresh_btn.grid(row=0, column=1, padx=8)
        
        # 创建数据显示区域
        data_container = ttk.Frame(self.main_frame, style='Custom.TFrame')
        data_container.grid(row=3, column=0, sticky=(tk.W, tk.E, tk.N, tk.S), padx=20)
        
        # 创建Treeview
        columns = ('variety', 'date')
        self.tree = ttk.Treeview(data_container, columns=columns, show='headings')
        
        # 设置列标题
        self.tree.heading('variety', text='品种', anchor='center')
        self.tree.heading('date', text='日期', anchor='center')
        
        # 设置列宽和对齐方式
        self.tree.column('variety', width=300, anchor='center')
        self.tree.column('date', width=150, anchor='center')
        
        # 添加滚动条
        vsb = ttk.Scrollbar(data_container, orient="vertical", command=self.tree.yview)
        hsb = ttk.Scrollbar(data_container, orient="horizontal", command=self.tree.xview)
        self.tree.configure(yscrollcommand=vsb.set, xscrollcommand=hsb.set)
        
        # 放置组件
        self.tree.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        vsb.grid(row=0, column=1, sticky=(tk.N, tk.S))
        hsb.grid(row=1, column=0, sticky=(tk.W, tk.E))
        
        # 创建Text小部件用于显示策略内容
        self.strategy_text = tk.Text(data_container, height=10, wrap='word', font=('Helvetica Neue', 12))
        self.strategy_text.grid(row=2, column=0, columnspan=2, sticky=(tk.W, tk.E), padx=5, pady=5)
        
        # 确保Treeview能够扩展
        data_container.grid_rowconfigure(0, weight=1)
        data_container.grid_columnconfigure(0, weight=1)
        
        # 绑定选择事件
        self.tree.bind('<<TreeviewSelect>>', self.on_tree_select)

        # 创建状态栏
        status_frame = ttk.Frame(self.main_frame, style='Custom.TFrame')
        status_frame.grid(row=4, column=0, sticky=(tk.W, tk.E), pady=(15, 0))
        
        self.status_label = ttk.Label(
            status_frame,
            text="正在准备获取最新报告...",
            font=('Helvetica Neue', 12),
            foreground='#B0B0B0',
            background='#1E1E1E'
        )
        self.status_label.grid(row=0, column=0, sticky=(tk.W, tk.E))
        status_frame.grid_columnconfigure(0, weight=1)
        
        # 数据库连接
        self.db = Database()
        
    def load_reports(self):
        # 清除现有数据
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        # 从数据库加载数据
        reports = self.db.get_latest_reports()
        if not reports:
            self.status_label.config(text='暂无数据，请点击"更新报告"按钮获取最新报告')
            return
        
        for report in reports:
            self.tree.insert('', tk.END, values=(report[0], report[2]))  # 只插入品种和日期
        self.status_label.config(text=f'已加载 {len(reports)} 条报告')

        # 选择第一行并显示策略内容
        if reports:
            self.tree.selection_set(self.tree.get_children()[0])  # 选择第一行
            self.show_strategy(reports[0][1])  # 显示第一条策略内容

    def show_strategy(self, strategy):
        self.strategy_text.delete(1.0, tk.END)  # 清空Text小部件
        self.strategy_text.insert(tk.END, strategy)  # 插入策略内容

    def on_tree_select(self, event):
        selected_item = self.tree.selection()[0]  # 获取选中的项
        item_values = self.tree.item(selected_item, 'values')  # 获取项的值
        variety = item_values[0]  # 获取品种
        reports = self.db.get_latest_reports()  # 重新加载报告以获取策略
        for report in reports:
            if report[0] == variety:  # 找到对应的策略
                self.show_strategy(report[1])  # 显示策略内容
                break

    def start_scraping(self):
        def scrape():
            try:
                self.status_label.config(text='正在获取最新报告，请稍候...')
                scraper = FuturesReportScraper(
                    r'C:\Users\23732\Downloads\chromedriver-win64 (1)\chromedriver-win64\chromedriver.exe'
                )
                scraper.scrape_all()
                self.root.after(0, lambda: self.load_reports())
                self.root.after(0, lambda: self.status_label.config(text='报告更新完成！'))
                messagebox.showinfo('完成', '报告更新完成！')
            except Exception as e:
                error_msg = f'更新报告时出错：{str(e)}'
                self.status_label.config(text=error_msg)
                messagebox.showerror('错误', error_msg)
        
        thread = threading.Thread(target=scrape)
        thread.daemon = True
        thread.start() 