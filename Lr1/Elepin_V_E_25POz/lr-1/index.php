<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form>
        <input type="text" name="str">
        <button>Отправить</button>
    </form>

    <?php

        if(isset($_GET['str'])){ //Проверка на наличие отправленной формы

            $str = mb_strtolower($_GET['str']); // Входные данные, сразу переводим в нижний регистр от "Дурака"
            $str_alt = '';   // Вторая строка, в которую будет записываться перевертывание входной строки     
    
            for( $i = mb_strlen($str) - 1; $i >= 0; $i-- ){ // цикл перевертывания
                $str_alt .= mb_substr($str, $i, 1);
            }
    
            if($str == $str_alt){ // Сравнивание двух строк
                $rez = $str . ' - это палиндром'; // Если верно, то значит это палиндром
            } else{
                $rez = $str . ' - это не палиндром'; // Если нет, то не палиндром
            }

            echo $rez;

        }


        
    ?>
</body>
</html>