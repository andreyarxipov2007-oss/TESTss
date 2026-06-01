word = input("Введите слово: ")
i = int(input("Введите номер позиции i: "))
word_lenght = 0
word_lenght = len(word)
if i < 1 or i > word_lenght:
    print("Ошибка: позиция вне диапазона")
else:
    target = word[i - 1]  
    result = ""

    for letter in word:
        if letter != target:
            result += letter

print("Результат:", result)