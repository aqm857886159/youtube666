from selenium import webdriver

# 设置ChromeDriver的路径（如果你已经将其添加到系统路径中，这一步可以省略）
# driver_path = '/path/to/chromedriver'
# driver = webdriver.Chrome(executable_path=driver_path)

# 如果ChromeDriver在系统路径中，你可以直接这样使用
driver = webdriver.Chrome()

# 现在你可以使用driver对象来控制Chrome浏览器了
driver.get("https://www.google.com")
print(driver.title)  # 打印网页标题

# 完成后，不要忘记关闭浏览器
driver.quit()