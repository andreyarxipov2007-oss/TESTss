using System;
public class Program
{
    public static void Main()
    {
                
        Console.WriteLine("Задание 14. Проверить, является ли слово палиндромом?");
        Console.Write("Введите слово: ");
        string word;
        word = Console.ReadLine().ToLower(); 
       
        int wordsize = word.Length;

        string answer = "";

        for (int i = 0; i < wordsize / 2; i++)
        {
            if (word[i] != word[wordsize - 1 - i])
            {
                answer = "Слово " + word + " не является палиндромом.";
                break;
            }
            else
                answer = "Слово " + word + " - палиндром";

        }

        Console.WriteLine(answer);

    }
}


