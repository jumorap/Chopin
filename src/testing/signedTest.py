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

#<button class="MuiButtonBase-root MuiButton-root MuiButton-text google-sign" tabindex="0" type="button" style="background: linear-gradient(45deg, rgb(255, 255, 255) 30%, rgb(255, 255, 255) 90%); border-radius: 30px; border: 0px; padding: 0px 20px;"><span class="MuiButton-label"><span class="MuiButton-startIcon MuiButton-iconSizeMedium"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" class="svg-inline--fa fa-google fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg></span>Sign in UNAL</span><span class="MuiTouchRipple-root"></span></button>
driver = webdriver.Chrome(ChromeDriverManager().install())
url_test = "http://localhost:3000/results"
accessWithoutPermission(driver,url_test)
accessWithPermission(driver,url_test)
