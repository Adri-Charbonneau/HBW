$mail="$env:MAIL"

Invoke-WebRequest -Uri "https://www.lynxeds.com/product/handbook-of-the-birds-of-the-world/" -OutFile "HBW.html"
$Source = Get-Content -path HBW.html -raw
$value = ($Source | select-string -pattern '([0-9]+,[0-9]*\.[0-9]+)' -AllMatches).Matches.Value

if ( $value.count -eq 1 )
{
  $original = "3537.00"
  $promo = $value -replace ","
  $very_original = "3537.00"
}
elseif ( $value.count -eq 2 )
{
  $original = $value[0] -replace ","
  $promo = $value[1] -replace ","
  $very_original = "3537.00"
}
else
{
  $original = $value[0] -replace ","
  $promo = $value[1] -replace ","
  $very_original = $value[2] -replace ","
}

$date = Get-Date -Format "yyyy-MM-dd"
echo $date

$line = "{0},{1},{2},{3}" -f  $date,$original,$promo,$very_original
echo $line
Add-Content -Path "./DATA/PRIX_HBW.csv" -Value "$line"

Remove-Item HBW.html

# git and create tag
git config user.name 'github-actions[bot]'
git config user.email 'github-actions[bot]@users.noreply.github.com'
git add .
git commit -m "[Bot] Update HBW price"
git push -f
