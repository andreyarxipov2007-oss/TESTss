using System;

// Определить, является ли данный текст числом, записанным в десятичной системе счисления
// (т.е. состоит только из арабских цифр от 0 до 9).

namespace pr_1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // бесконечный цикл
            while (true)
            {
                string inputStr = "";

                Console.WriteLine("To exit, press Q");

                // просим пользователя ввести строку
                Console.Write("Input string: ");

                // сохраняем введенную строку в переменную inputStr
                inputStr = Console.ReadLine();

                // проверка на ввод пустой строки
                if (String.IsNullOrEmpty(inputStr))
                {
                    Console.WriteLine("The string cannot be empty!\n");
                    continue;
                }

                // при вводе Q или q завершаем работу с программой
                if (inputStr == "Q" || inputStr == "q")
                    break;

                // получаем булевое значение (строка является/не является числом)
                bool stringIsNumber = StringIsNumber(inputStr);

                // вывод результата на печать в текстовом виде
                PrintResult(stringIsNumber);
            }
        }

        // возвращает булевое значение (строка является/не является числом)
        public static bool StringIsNumber(string inputStr)
        {
            // перебор элементов строки inputStr
            foreach (char c in inputStr)
            {
                int num = 0;

                // добавляем обработчик исключений на случай возникновения Exception
                try {
                    // конвертируем символ строки в целочисленное значение
                    // c - 48 выполняется для смещения кода символа к его реальному числовому значению
                    num = Convert.ToInt32(c - 48); 
                }

                // возвращаем false в случае возникновения Exception
                catch { return false; }

                // проверяем, является ли полученный элемент строки числом после преобразования
                if (num < 0 || num > 9)
                    return false;
            }

            return true;
        }

        // вывод результата на печать в текстовом виде
        public static void PrintResult(bool stringIsNumber)
        {
            if (stringIsNumber)
                Console.WriteLine("The string is a number!\n");
            else
                Console.WriteLine("The string is not a number!\n");
        }
    }
}
