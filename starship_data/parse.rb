def format_line(line)
  line.gsub!('"', '\"')
  line.gsub!("\r\n", "")
  return "\"#{line}\\n\"+"
end
File.open('hangars.csv').each {|x| puts format_line(x) }
