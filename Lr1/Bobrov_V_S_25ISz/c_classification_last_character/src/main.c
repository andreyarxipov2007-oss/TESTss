#include <string.h>
#include <unistd.h>

static char buf[1024];

static int vowels[] = {
    1025, 1040, 1045, 1048, 1054, // Ё А Е И О
    1059, 1067, 1069, 1070, 1071, // У Ы Э Ю Я
    1072, 1077, 1080, 1086, 1091, // а е и о у
    1099, 1101, 1102, 1103, 1105  // ы э ю я ё
};

static void fsync_write(const char *msg) {
    write(STDOUT_FILENO, msg, strlen(msg));
    fsync(STDOUT_FILENO);
}

int main(int argc, char **argv) {
    int result, cntr;
    unsigned int unicode, last_unicode_cyrillic;

    int left, right, midle, midle_num;

    if (argc == 2) {
        result = strlen(argv[1]);
        memcpy(buf, argv[1], result);
    } else {
        fsync_write("введите русское слово: ");

        result = read(STDIN_FILENO, buf, sizeof(buf));

        if (result < 0) {
            fsync_write("ошибка: read\n");
            return 0;
        }
    }

    last_unicode_cyrillic = 0;
    cntr = 0;

    while (cntr < result) {

        if ((buf[cntr] >> 7) == 0) {
            unicode = buf[cntr] & 0x7f;
            cntr += 1;
            goto done;
        }

        if ((buf[cntr] >> 5) == 6) {
            unicode = (buf[cntr] & 0x1f) << 6;

            if ((buf[cntr + 1] >> 6) ^ 0x2) goto error;
            unicode |= (buf[cntr + 1] & 0x3f);

            cntr += 2;
            goto done;
        }

        if ((buf[cntr] >> 4) == 14) {
            unicode = (buf[cntr] & 0x0f) << 12;

            if ((buf[cntr + 1] >> 6) ^ 0x2) goto error;
            unicode |= (buf[cntr + 1] & 0x3f) << 6;

            if ((buf[cntr + 2] >> 6) ^ 0x2) goto error;
            unicode |= (buf[cntr + 2] & 0x3f);

            cntr += 3;
            goto done;
        }

        if ((buf[cntr] >> 3) == 30) {
            unicode = (buf[cntr] & 0x07) << 18;

            if ((buf[cntr + 1] >> 6) ^ 0x2) goto error;
            unicode |= (buf[cntr + 1] & 0x3f) << 12;

            if ((buf[cntr + 2] >> 6) ^ 0x2) goto error;
            unicode |= (buf[cntr + 2] & 0x3f) << 6;

            if ((buf[cntr + 3] >> 6) ^ 0x2) goto error;
            unicode |= (buf[cntr + 3] & 0x3f);

            cntr += 4;
            goto done;
        }

        goto error;

done:

        if (unicode == '\r' || unicode == '\n') {
            continue;
        }

        if ((unicode >= 1072 && unicode <= 1103) || unicode == 1105) {
            last_unicode_cyrillic = unicode;
            continue;
        }

        if ((unicode >= 1040 && unicode <= 1071) || unicode == 1025) {
            last_unicode_cyrillic = unicode;
            continue;
        }

        fsync_write("ошибка: введенна неверная строка\n");
        return 0;
    }

    if (last_unicode_cyrillic == 0) {
        fsync_write("ошибка: введенна пустая строка\n");
        return 0;
    }

    left = 0;
    right = sizeof(vowels) / sizeof(vowels[0]) - 1;

    while (left <= right) {
        midle = left + (right - left) / 2;
        midle_num = vowels[midle];

        if (midle_num == last_unicode_cyrillic) {
            fsync_write("гласная\n");
            return 0;
        }

        if (midle_num < last_unicode_cyrillic) {
            left = midle + 1;
            continue;
        } else {
            right = midle - 1;
            continue;
        }

    }

    fsync_write("согласная\n");

    return 0;

error:

    fsync_write("ошибка: введенна некорректная utf8 строка\n");

    return 0;
}

