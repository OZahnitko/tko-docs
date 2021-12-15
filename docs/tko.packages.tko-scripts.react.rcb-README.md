# React Component Boilerplate (rcb)

```bash
rcb MyComponent
```

A simple script to create a boilerplate functional React component, its styles files, and an index file to export it.

<!-- TODO: Describe the folder structure. -->

```bash
component_name=$1
```

- The first variable is the name of the component to create.

```bash
make_component_file() {
cat > $1.tsx << EOF
import { Wrapper } from "./Styles";

export const $1 = () => {
    return <Wrapper>$1</Wrapper>;
};

EOF
}
```

```bash
cat >> $1.tsx << EOF ... EOF
```

- `cat` - nothing to create an empty file.
- `$1` - name of the component, accepted as function input.
  - ❓ Since `component_name` is already stored, can that be re-used instead?
    - ✅ It can be, but I'll keep it in as `$1`, just in case I need to do something with the component name (e.g. validate, format, etc.).
- `EOF` - heredoc to write file content.

```bash
make_style_file() {
cat > Styles.tsx << EOF
import styled from "styled-components";

export const Wrapper = styled.div\`\`;

EOF
}
```

```bash
make_index_file() {
cat > index.ts << EOF
export { $1 } from "./$1";

EOF
}
```

```bash
if [[ -d "$PWD/$component_name" ]]; then
    echo "Directory '$component_name' already exists!"
```

- `-d` - checks if a given path exits.
  - If it does, just echo out a message, and move on.
  - It would be good to be able to check which of the needed files already exists in the dir, so maybe just add the missing ones.

```bash
else
    mkdir $component_name && cd $_
    make_component_file $component_name
    make_style_file
    make_index_file $component_name
fi
```

## Other

### Passing flags

```bash
#!/bin/bash

while getopts s:p flags
do
    case "$flags" in
        s) echo "Option -s with argument -> $OPTARG.";;
        p) echo "Option -p with no argument.";;
    esac
done
```

```bash
while getopts **s:p** flags
```

- `s:p` - `-s` flag would accept an input, but the `-p` flag would not.
- The options are stored in `flags`.
- `OPTARG` - the argument that was passed to the flag.
  - ❓ Can it accept more than 1 argument?
