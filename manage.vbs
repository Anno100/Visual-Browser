Option Explicit
Dim obj : set obj = CreateObject("WScript.Shell") 'Shell Programme ausführen


Dim task : task = inputbox("0:add Class"&vbCrLf&"1:add Page")

if task = "0" then 
    obj.Run"addClass.vbs"
ElseIf task = "1" Then
    obj.Run"addPage.vbs"
Else
    MsgBox("Task "&task&" not existing")
end if
