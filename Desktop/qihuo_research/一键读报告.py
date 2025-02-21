from gui import FuturesReportGUI
import tkinter as tk

def main():
    # 创建主窗口
    root = tk.Tk()
    
    # 设置窗口在屏幕中央
    window_width = 1200
    window_height = 800
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()
    x = (screen_width - window_width) // 2
    y = (screen_height - window_height) // 2
    root.geometry(f"{window_width}x{window_height}+{x}+{y}")
    
    # 创建应用
    app = FuturesReportGUI(root)
    
    # 程序启动后自动开始抓取策略
    root.after(1000, app.start_scraping)  # 延迟1秒后开始抓取，确保界面已完全加载
    
    # 启动主循环
    root.mainloop()

if __name__ == "__main__":
    main()