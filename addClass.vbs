
Dim fa : set fa = CreateObject("Scripting.FileSystemObject")
Dim current
Dim name : name = InputBox("Class name:","Set Class name")
Dim ex_name : ex_name = InputBox("Interface name:","Enter Interface")
Dim inputFile,outputFile

if ex_name = "" then ex_name = "true"

if name <> "" then 
    fa.CreateTextFile("lib/"&name&".js")
    fa.OpenTextFile("lib/"&name&".js",2).Write "let check_"&name&" = setInterval(() => {"&vbCrLf&"if ("&ex_name&") {"&vbCrLf&vbTab&name&" = class "&name&" extends "&ex_name&" {"&vbCrLf&vbTab&vbTab&"//enter your code"&vbCrLf&vbTab&"}"&vbCrLf&vbTab&"load_"&name&" = true;"&vbCrLf&vbTab&"clearInterval(check_"&name&");"&vbCrLf&vbTab&"}"&vbCrLf&"else{"&vbCrLf&vbTab&"console.log('wait');"&vbCrLf&"}"&vbCrLf&"},1);"
    FindAndReplace "lib/Boot.js","/*[CLASS_INIT]*/","class "&name&" extends "&ex_name&"{};"&vbCrLf&vbCrLf&"/*[CLASS_INIT]*/"
    FindAndReplace "lib/Boot.js","/*[CLASS_IMPORT]*/","importJs('../lib/"&name&".js');"&vbCrLf&vbTab&"load_"&name&" = false;"&vbCrLf&vbCrLf&vbTab&"/*[CLASS_IMPORT]*/"
    FindAndReplace "lib/Boot.js","/*[CLASS_LOAD]*/","&& load_"&name&"/*[CLASS_LOAD]*/"

end if




function FindAndReplace(strFilename, strFind, strReplace)
    Set inputFile = fa.OpenTextFile(strFilename, 1)
    strInputFile = inputFile.ReadAll
    inputFile.Close
    Set inputFile = Nothing
    Set outputFile = fa.OpenTextFile(strFilename,2,true)
    outputFile.Write Replace(strInputFile, strFind, strReplace)
    outputFile.Close
    Set outputFile = Nothing
end function 