Invoke-WebRequest -Uri "https://www.lynxeds.com/product/handbook-of-the-birds-of-the-world/" -OutFile "HBW.html"
$Source = Get-Content -path HBW.html -raw
$value = ($Source | select-string -pattern '([0-9]+,[0-9]*\.[0-9]+)' -AllMatches).Matches.Value

$original = $value[0] -replace ","
$promo = $value[1] -replace ","
$very_original = $value[2] -replace ","

$date = Get-Date -Format "yyyy-mm-dd"
echo $date

$line = "{0},{1},{2},{3}" -f  $date,$original,$promo,$very_original
echo $line
$line | Add-Content "./DATA/PRIX_HBW.csv"

Remove-Item HBW.html

# git and create tag
# git config --local user.email "a-d-r-i@outlook.fr"
# git config --local user.name "A-d-r-i"
# git add .
# git commit -m "[Bot] Update HBW price" --allow-empty
# git push -f