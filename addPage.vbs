Option Explicit
Dim obj : set obj = CreateObject("WScript.Shell") 'Shell Programme ausführen
Dim fso : set fso = CreateObject("Scripting.FileSystemObject") 'File System


Dim name : name = inputbox("Name:")
Dim exist : exist = fso.FolderExists(name)

if exist = 0 then 
    fso.CreateFolder(name)
    
    Dim html : set html = fso.CreateTextFile(name&"\Page.html")
    Dim js : set js = fso.CreateTextFile(name&"\Main.js")
        
    html.Write"<!DOCTYPE html>"&vbCrLf&"<html lang='en'>"&vbCrLf&vbTab&"<head>"&vbCrLf&vbTab&vbTab&"<meta charset='UTF-8'>"&vbCrLf&vbTab&vbTab&"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"&vbCrLf&vbTab&vbTab&"<title>"&name&"</title>"&vbCrLf&vbTab&"</head>"&vbCrLf&vbTab&"<body>"&vbCrLf&vbTab&vbTab&"<script>IMPORT=true</script>"&vbCrLf&vbTab&vbTab&"<script src='../lib/Boot.js'>"&vbCrLf&vbTab&vbTab&"</script>"&vbCrLf&vbTab&"</body>"&vbCrLf&"</html>"
    js.Write"function Main(){"&vbCrLf&vbCrLf&"}"
Else
    MsgBox("existiert schon")
end if
