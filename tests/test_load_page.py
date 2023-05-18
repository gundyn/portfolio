from selenium import webdriver

def test_load_page():
    driver = webdriver.Chrome()
    
    driver.get('http://localhost:8080')  # Replace this with your server URL and port
    assert 'Nathan T. Gundy Portfolio' in driver.title  # Replace with your page title

    driver.quit()
