param(
    [Parameter(Mandatory=$true)]
    [string]$RepoUrl
)

$SkillName = "zygote"
$TargetDir = Join-Path $env:USERPROFILE ".claude\skills\$SkillName"

New-Item -ItemType Directory -Force -Path (Join-Path $env:USERPROFILE ".claude\skills") | Out-Null

if (Test-Path $TargetDir) {
    Write-Host "Existing install found at $TargetDir — updating."
    git -C $TargetDir pull --ff-only
} else {
    git clone $RepoUrl $TargetDir
}

Write-Host "my-boilerplate skill installed to $TargetDir"
