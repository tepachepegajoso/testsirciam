import subprocess
import os

scripts_folder = r"C:\Users\jmalvarez\Documents\TestCafe"  # Todo lo meti en la misma carpeta

# Pueden ir agregando scripts, hasta que muera la RAM
scripts = [
    "sirciam.js",  
    "sirciam2.js",  
    "sirciam3.js"   
]


def queso(script_name):
    script_path = os.path.join(scripts_folder, script_name)

    return subprocess.Popen(
        ["cmd", "/c", "start", "testcafe", "chrome", script_path],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )

processes = [queso(script) for script in scripts]

for process in processes:
    process.wait()

print("Ya quedó")

