if(document.URL.includes("/hotelv2"))
{
    setTimeout(()=>{
        let tag: HTMLScriptElement = document.createElement("script");
        tag.setAttribute("src", chrome.runtime.getURL("extension_bundle.js"));
        tag.setAttribute("author", "skyblet_extension");
        document.head.appendChild(tag);
    }, 1);
}