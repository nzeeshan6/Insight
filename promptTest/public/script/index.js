let patentNumberField = document.getElementById("patentNumber");
let searchLogsField = document.getElementById("searchLogs");
let generateButton = document.getElementById("getInsight");
let insightField = document.getElementById("insightField");


generateButton.addEventListener("click", async () => {
  let searchPromptField = document.getElementsByClassName("searchPrompt");
  var patentNumber = patentNumberField.value;
  var searchLogs = searchLogsField.value;
  var searchPrompts = [];
  // console.log(searchPromptField);
  for (var i=0;i<searchPromptField.length;i++){
    searchPrompts.push(searchPromptField[i].value);
  }
  console.log(searchPrompts);
  // Check if Everything is Correctly Filled
  if (
    patentNumber &&
    searchLogs &&
    patentNumber.length > 0 &&
    searchLogs.length > 0
  ) {
    // Deisplaying the Response Section
    let responseSection = document.getElementById("response-section");
    responseSection.style = "display:block";
    responseSection.scrollIntoView({ behaviour: "smooth" });
    try {
      // Pushing the input data to the Server
      const response = await fetch("/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patentNumber: patentNumber,
          searchLogs: searchLogs,
          searchPrompts:searchPrompts,
        }),
      });
      // Awaiting Response for the first push
      const text = await response.text();
      const data = await JSON.parse(text);

      // Updating the Status
      insightField.innerHTML = data.message;
      // console.log(response.status);

      // Display the data on your web page or handle it as needed
      const refreshInterval = setInterval(async () => {
        const generatedInsightResponse = await fetch("/insight-result", {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        const resultData = await generatedInsightResponse.text();
        const generatedInsight = await JSON.parse(resultData);
        // console.log("Generated Insight: ", generatedInsight);
        if (generatedInsightResponse.status === 200) {
          clearInterval(refreshInterval);
        }
        insightField.innerHTML = generatedInsight.message;
      }, 2000);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
  }
});
