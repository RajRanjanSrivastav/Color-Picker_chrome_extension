const btn = document.querySelector(".pickerbtn");
const grid = document.querySelector(".colorGrid");
const value = document.querySelector(".colorValue");
btn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  //   console.log(tab);

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: pickColor,
  }, async(injectionResult)=>{
    const [data] = injectionResult;
    if(data.result)
    {
      const ans = data.result.sRGBHex;
      value.innerHTML = ans;
      grid.style.backgroundColor = ans;
      console.log(grid);
      try{
        await navigator.clipboard.writeText(ans);
      }
      catch(err)
      {
        console.log(err);
      }
    }
    // console.log(injectionResult);
  });
});

async function pickColor() {
  // console.log("script is working");
  try {
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
    // const selctColor = await eyeDropper.open();
    // console.log(selctColor);
  } catch (err) {
    console.log(err);
  }
}
