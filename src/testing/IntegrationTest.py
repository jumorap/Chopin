from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from webdriver_manager.chrome import ChromeDriverManager
import time


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


def searchSubject():
    time.sleep(2)
    text_field = driver.find_element_by_id("search")
    text_field.send_keys("In"+Keys.ARROW_DOWN)
    option = driver.find_element_by_class_name("search-item-container")
    option.click()


def reviewDocument():
    card = driver.find_elements_by_class_name("files-programme")[0]
    card.click()


driver = webdriver.Chrome(ChromeDriverManager().install())
url_test = "http://localhost:3000/results"
accessWithPermission(driver,url_test)
time.sleep(2)
searchSubject()
time.sleep(2)
reviewDocument()
print("Integration Test Succeeded!!")
