using System;

class Program
{
    static void Main()
    {
        // 1) Ввод слова
        Console.Write("Введите слово (минимум 6 букв): ");
        string word = Console.ReadLine();

        // 2) Проверка на null
        if (word == null)
        {
            return;
        }

        // Проверка длины слова
        if (word.Length < 6)
        {
            Console.WriteLine("Слово должно содержать минимум 6 букв.");
            return;
        }

        // 3) Инициализация переменных
        int i = 0;
        int length = word.Length;

        Console.WriteLine("Номера букв в алфавите:");

        // 4) Цикл обработки слова
        while (i < length)
        {
            char ch = word[i];

            ch = Char.ToLower(ch);

            if (ch >= 'a' && ch <= 'z')
            {
                int number = ch - 'a' + 1;
                Console.Write(number + " ");
            }

            i = i + 1;
        }
    }
}

