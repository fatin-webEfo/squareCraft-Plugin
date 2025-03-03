
async function createWidget() {
    console.log("📥 Fetching widget module...");
    
    try {
        const module = await import("https://fatin-webefo.github.io/squareCraft-Plugin/html.js");
        
        if (module && module.html) {
            console.log("✅ HTML module loaded successfully!", module.html());
            
            const widgetContainer = document.createElement("div");
            widgetContainer.id = "squarecraft-widget-container";
            widgetContainer.classList.add("squareCraft-fixed", "squareCraft-text-color-white", "squareCraft-universal", "squareCraft-z-9999");
     

            widgetContainer.innerHTML = module.html();
            document.body.appendChild(widgetContainer);
            

        } else {
            console.error("❌ Failed to retrieve the HTML function from module!");
        }

    } catch (error) {
        console.error("🚨 Error loading HTML module:", error);
    }
}




function makeWidgetDraggable() {
    const widget = document.getElementById("squarecraft-widget-container");
  
    if (!widget) {
        console.warn("❌ Widget not found.");
        return;
    }
    widget.style.position = "fixed";
    widget.style.cursor = "grab";
    widget.style.zIndex = "999";
  
    let offsetX = 0, offsetY = 0, isDragging = false;
  
    widget.addEventListener("mousedown", (event) => {
        if (event.target.tagName === "INPUT" || event.target.tagName === "SELECT" || event.target.isContentEditable) {
            return; 
        }
  
        event.preventDefault();
        isDragging = true;
  
        offsetX = event.clientX - widget.getBoundingClientRect().left;
        offsetY = event.clientY - widget.getBoundingClientRect().top;
  
        widget.style.transition = "none";
        widget.style.userSelect = "none";
        widget.style.cursor = "grabbing";
  
        document.addEventListener("mousemove", moveAt);
        document.addEventListener("mouseup", stopDragging);
    });
  
    function moveAt(event) {
        if (!isDragging) return;
  
        let newX = event.clientX - offsetX;
        let newY = event.clientY - offsetY;
        newX = Math.max(0, Math.min(window.innerWidth - widget.offsetWidth, newX));
        newY = Math.max(0, Math.min(window.innerHeight - widget.offsetHeight, newY));
  
        widget.style.left = `${newX}px`;
        widget.style.top = `${newY}px`;
    }
  
    function stopDragging() {
        isDragging = false;
        widget.style.cursor = "grab";
        document.removeEventListener("mousemove", moveAt);
        document.removeEventListener("mouseup", stopDragging);
  
        localStorage.setItem("widget_X", widget.style.left);
        localStorage.setItem("widget_Y", widget.style.top);
    }
  
    let lastX = localStorage.getItem("widget_X");
    let lastY = localStorage.getItem("widget_Y");
    if (lastX && lastY) {
        widget.style.left = lastX;
        widget.style.top = lastY;
    } else {
        widget.style.left = "50px"; // Default position
        widget.style.top = "50px";
    }
  }