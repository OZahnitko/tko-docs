# The Big Show

## Recursive Directory Reading

The solution was obtained from this [Stack Overflow](https://stackoverflow.com/questions/41462606/get-all-files-recursively-in-directories-nodejs/47492545) post (thanks [Smally](https://stackoverflow.com/users/10531223/smally)).

- _BTW, should really make a SO account._

```typescript
const FILES: string[] = [];

const throughDir = (parentDirectory: string): void =>
  readdirSync(parentDirectory).forEach((dir) => {
    // ...

    return lstatSync(absolutePath).isDirectory()
      ? throughDir(absolutePath)
      : FILES.push(absolutePath);
  });

throughDir(resolve(__dirname, "../../.."));
```

## Dynamic Regular Expression

```typescript
if (
  absolutePath.match(
    new RegExp(resolve(__dirname, "../docs").split("/").join("\\/"), "g")
  )
)
  return;
```

<!-- TODO: Documentation for grabbing links from READMEs.  -->

```typescript
"".match(/\[(?<link_label>.*)\]\((?<link_url>.*)\)/g);
\[(?<link_label>.*?)\]\((?<link_url>.*?)\)
```
