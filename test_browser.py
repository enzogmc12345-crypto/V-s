from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # Listen for all console logs
        page.on("console", lambda msg: print(f"CONSOLE {msg.type}: {msg.text}"))
        
        # Listen for uncaught exceptions
        page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))

        print("Loading index.html...")
        page.goto("file:///Users/enzogiuseppe/Library/CloudStorage/OneDrive-TramaComunicação/vós/index.html")
        
        print("Page loaded. Waiting 2 seconds for JS execution...")
        page.wait_for_timeout(2000)
        
        print("Checking if .hero-content is visible...")
        is_visible = page.is_visible(".hero-content")
        print(f"hero-content visible? {is_visible}")
        
        # Check if the class contains 'visible'
        classes = page.evaluate("document.querySelector('.hero-content').className")
        print(f"hero-content classes: {classes}")

        # Check document body size
        body_height = page.evaluate("document.body.scrollHeight")
        print(f"Body height: {body_height}")
        
        page.screenshot(path="debug_screenshot.png")
        print("Screenshot saved to debug_screenshot.png")
        
        browser.close()

if __name__ == '__main__':
    run()
