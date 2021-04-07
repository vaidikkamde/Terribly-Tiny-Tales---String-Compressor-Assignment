## Terribly Tiny Tales - String Compressor Assignment

[Demo Link]()

### About The Project

This project is an implementation of a string shortner or compressor which takes a string as an input and encodes the string and compressing it and returnig the compressed string as an output. This project also contains a decoder whic takes the compressed string as an input and returns the original string as an output.

#### LZW (Lempel–Ziv–Welch) Compression technique

This project uses the LZW compression technique which is a lossless compression technique. A lossless compression means that no data is lost while compressing.

##### How Does It Works ?

LZW compression works by reading a sequence of symbols, grouping the symbols into strings, and converting the strings into codes. Because the codes take up less space than the strings they replace, we get compression.

Here we are using the ASCII code as the code table which typically contains 8 binary bits allowing up to 256 unique symbols for data. We try to extend the library to 9 to 12 bits per character. The new unique symbols are made up of combinations of symbols that occurred previously in the string. This methord can both compress and decompress the data.
</br>

#### Implementation

##### Compression

The idea of the compression algorithm is the following: as the input data is being processed, a dictionary keeps a correspondence between the longest encountered words and a list of code values. The words are replaced by their corresponding codes and so the input file is compressed. Therefore, the efficiency of the algorithm increases as the number of long, repetitive words in the input data increases.

<code>PSEUDOCODE
1 Initialize table with single character strings
2 P = first input character
3 WHILE not end of input stream
4 C = next input character
5 IF P + C is in the string table
6 P = P + C
7 ELSE
8 output the code for P
9 add P + C to the string table
10 P = C
11 END WHILE
12 Fetch code for P and Convert it to ASCII using the dictonary.
13 output code for P and ASCII </code>
</br>

##### Decompression

The LZW decompressor creates the same string table during decompression. It starts with the first 256 table entries initialized to single characters. The string table is updated for each character in the input stream, except the first one.Decoding achieved by reading codes and translating them through the code table being built.

<code>PSEUDOCODE
1 Initialize table with single character strings
2 OLD = first input code
3 output translation of OLD
4 WHILE not end of input stream
5 NEW = next input code
6 IF NEW is not in the string table
7 S = translation of OLD
8 S = S + C
9 ELSE
10 S = translation of NEW
11 output S
12 C = first character of S
13 OLD + C to the string table
14 OLD = NEW
15 END WHILE</code>
</br>

#### Advantages Of LZW

- LZW requires no prior information about the input data stream.
- LZW can compress the input stream in one single pass.
- Another advantage of LZW its simplicity, allowing fast execution.
  </br>

#### Resources

- [LZW (Lempel–Ziv–Welch) Compression technique - GeeksforGeeks](https://www.geeksforgeeks.org/lzw-lempel-ziv-welch-compression-technique/#:~:text=LZW%20Decompression,stream%2C%20except%20the%20first%20one.)
- [LZW JavaScript Implementation Example - Rosettacode](http://rosettacode.org/wiki/LZW_compression#JavaScript)
