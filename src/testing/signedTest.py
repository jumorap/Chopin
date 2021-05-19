from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from webdriver_manager.chrome import ChromeDriverManager
import time


#This test will evaluate the restriction to only UNAL students
def accessWithoutPermission(driver, url):
    driver.get(url)
    time.sleep(1)
    if(driver.current_url==url):
        print("Test Failed: access without permission")
    else:
        print("Test Succeeded: can't access without permission")


def accessWithPermission(driver, url):
    driver.get("https://accounts.google.com/login")
    time.sleep(1)
    text_field = driver.find_element_by_id("identifierId")
    text_field.send_keys("nivalderramas@unal.edu.co")
    text_field.send_keys(Keys.TAB+Keys.TAB+Keys.TAB+Keys.RETURN)
    time.sleep(1)
    text_field = driver.find_element_by_id("username")
    text_field.send_keys("nivalderramas")
    text_field.send_keys(Keys.TAB+"Unal2021"+Keys.RETURN)
    time.sleep(4)
    driver.get(url)
    time.sleep(1)
    button = driver.find_element_by_class_name("MuiButtonBase-root")
    button.click()


driver = webdriver.Chrome(ChromeDriverManager().install())
url_test = "http://localhost:3000/results"
accessWithoutPermission(driver,url_test)
accessWithPermission(driver,url_test)
