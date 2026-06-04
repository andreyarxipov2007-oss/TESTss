using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program
    {
        static void Main()
        {
            Console.Write("Введите строку: ");
            string s = Console.ReadLine();

            int maxLen = MaxDigitSequenceLength(s);

            Console.WriteLine("Максимальная длина последовательности цифр подряд: " + maxLen);
        }

        /// <summary>
        /// Возвращает максимальную длину последовательности подряд идущих цифр в строке.
        /// </summary>
        static int MaxDigitSequenceLength(string s)
        {
            // Если строка пустая или null, ответ 0.
            if (string.IsNullOrEmpty(s))
                return 0;

            int currentLen = 0;
            int maxLen = 0;

            // n = длина строки 
            int n = s.Length;

            int i = 0;
            while (i < n)
            {
                char c = s[i];

                bool isDigit = IsDigit(c);

                if (isDigit)
                {
                    currentLen = currentLen + 1;
                    if (currentLen > maxLen)
                    {
                        maxLen = currentLen;
                    }
                }
                else
                {
                    currentLen = 0;
                }

                i = i + 1;
            }

            return maxLen;
        }

        /// <summary>
        /// Возвращает true, если символ c — цифра '0'..'9'.
        /// </summary>
        static bool IsDigit(char c)
        {
            return c >= '0' && c <= '9';
        }
    }
}
