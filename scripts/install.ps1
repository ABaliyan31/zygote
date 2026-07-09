param(
    [Parameter(Mandatory=$true)]
    [string]$RepoUrl
)

$SkillName = "zygote"
$TargetDir = Join-Path $env:USERPROFILE ".claude\skills\$SkillName"
$TmpDir = Join-Path $env:TEMP ([System.Guid]::NewGuid().ToString())

git clone --depth 1 $RepoUrl $TmpDir

New-Item -ItemType Directory -Force -Path (Join-Path $env:USERPROFILE ".claude\skills") | Out-Null
if (Test-Path $TargetDir) {
    Remove-Item -Recurse -Force $TargetDir
}
New-Item -ItemType Directory -Force -Path $TargetDir | Out-Null
Copy-Item (Join-Path $TmpDir "SKILL.md") $TargetDir
Copy-Item -Recurse (Join-Path $TmpDir "templates") $TargetDir

Remove-Item -Recurse -Force $TmpDir

Write-Host "zygote skill installed to $TargetDir"
