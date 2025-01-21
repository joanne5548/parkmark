with open('./raw_data/national_park_name_list_full.txt', 'r', encoding="utf8") as txt_file:
    file_content = txt_file.read()

remove_newline_content = file_content.replace('\n\n\n\n\n', '\n')
remove_newline_content = remove_newline_content.replace('\n\n\n\n', '\n')
remove_newline_content = remove_newline_content.replace('\n\n\n', '\n')
remove_newline_content = remove_newline_content.replace('\n\n', '\n')
remove_newline_content = remove_newline_content.replace(' ‡', '')
remove_newline_content = remove_newline_content.replace(' *', '')
remove_newline_content = remove_newline_content.replace(' †', '')
print(remove_newline_content)

with open('./raw_data/filtered_national_park_name_list_full.txt', 'w', encoding="utf8") as file:
    file.write(remove_newline_content)