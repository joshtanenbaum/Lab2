
$(document).ready(function(){
    //fill quiz frame with data   div p div w labels, p div w labels
    $.getJSON("data.json", function(data) {
        var elems, txtnode, imgnode, inputnode;
        elems = [document.getElementById("quiz")];
        elems[0].appendChild(document.createTextNode(data["title"]));
        for (i = 0; i < data["questions"].length; i += 1) {
            elems[1] = document.createElement("p");
            txtnode = document.createTextNode(data["questions"][i]["text"]);
            elems[1].appendChild(txtnode);
            elems[0].appendChild(elems[1]);
            elems[1] = document.createElement("div");
            for (j = 0; j < data["options"][i].length; j += 1) {
                elems[2] = document.createElement("label");
                inputnode = document.createElement("input");
                inputnode.setAttribute("type", "radio");
                inputnode.setAttribute("name", "q" + i);
                inputnode.setAttribute("val", data["options"][i][j]["val"]);
                elems[2].appendChild(inputnode);
                imgnode = document.createElement("img");
                imgnode.setAttribute("src", data["options"][i][j]["image"]);
                elems[2].appendChild(imgnode);
                elems[2].appendChild(document.createTextNode(data["options"][i][j]["text"]));
                elems[1].appendChild(elems[2]);   //append label to q div
            }
            elems[0].appendChild(elems[1]);  
        }
        
        //fade unclicked options
        $("input[type=radio]").change(function() {
            var q = $(this).attr("name");
            $("input[type=radio][name=" + q + "]:checked ~ img").css("opacity", "1");
            $("input[type=radio][name=" + q + "]:not(:checked) ~ img").css("opacity", "0.5");
        });


        //calculate score on submit button press
        $('#SubmitButton').click(function() {
            // gather all checked radio-button values
            var choices = [];
            $("input[type=radio]:checked").each(function(i) { choices.push($(this).attr("val")); });
            
            // now we have an array of 0s and 1s. Count and return how many 1s.
            if (choices.length != 10) {
                document.getElementById("answer_box").innerText = "Error: Didn't Answer All Questions";
                return;
            }
            var score = 0;
            for (i = 0; i < choices.length; i += 1) {
                score += Number(choices[i]);
            }
            score = (score / 10) * 100
            score = score + "%"
            document.getElementById("answer_box").innerText = "Score = " + score;
        });

    });
});