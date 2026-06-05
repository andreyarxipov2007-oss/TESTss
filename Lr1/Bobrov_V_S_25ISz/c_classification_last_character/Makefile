
CC = gcc
CFLAGS = -Wall -std=c99 -O2 -pipe -march=native
LIBS =

PREF_SRC = ./src
PREF_OBJ = ./target

TARGET=$(PREF_OBJ)/binary

SRC = $(wildcard $(PREF_SRC)/*.c)
OBJ = $(patsubst $(PREF_SRC)/%.c, $(PREF_OBJ)/%.o, $(SRC))

all: $(TARGET)

$(TARGET): $(OBJ)
	$(CC) $(OBJ) -o $(TARGET) $(LIBS)

$(PREF_OBJ)/%.o: $(PREF_SRC)/%.c
	-@mkdir -p $(PREF_OBJ)
	$(CC) $(CFLAGS) -c $< -o $@

run: $(TARGET)
	./$(TARGET)

clean:
	-rm $(TARGET) $(PREF_OBJ)*.o

test: $(TARGET)
	cat words.txt | xargs -I {} -n 1 sh -c "echo -n {} ':: ' && ./$(TARGET) {}"
