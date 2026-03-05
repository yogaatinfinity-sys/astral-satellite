$pngFile = "C:\Users\pc\.gemini\antigravity\brain\7118af8b-1718-458d-ae47-f663eb753803\media__1772711692559.png"
$bytes = [IO.File]::ReadAllBytes($pngFile)
$ms = New-Object IO.MemoryStream(,$bytes)
Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromStream($ms)

$minX = $bmp.Width
$minY = $bmp.Height
$maxX = 0
$maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.A -gt 10 -and ($pixel.R -lt 250 -or $pixel.G -lt 250 -or $pixel.B -lt 250)) {
            if ($x -lt $minX) { $minX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
$w = $maxX - $minX + 1
$h = $maxY - $minY + 1
Write-Host "BBOX: $minX, $minY, $w, $h," $bmp.Width "," $bmp.Height
