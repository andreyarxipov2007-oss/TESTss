A = InputBox("Введите слово А")
B = InputBox("Введите слово B")
For i = 0 To Len(B)-1 
	Ch = Left(Right(B,Len(B)-i),1)
	A = Replace(A,LCase(Ch),"")
	A = Replace(A,UCase(Ch),"")
Next
MsgBox("Итоговое слово: " & A)

