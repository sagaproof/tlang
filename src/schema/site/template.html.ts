const TAB_SPACES = 2;
const htmlSkeleton = function (title: string, lines: string[]): string {
    return `
<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
      integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
      crossorigin="anonymous"
    />
    <script
      defer
      src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js"
      integrity="sha384-y23I5Q6l+B6vatafAwxRu/0oK/79VlbSz7Q9aiSZUvyWYIYsd+qj+o24G5ZU2zJz"
      crossorigin="anonymous"
    ></script>
    <link rel="stylesheet" href="index.css" />
  </head>
  <body>
    <div #="container">
      ${lines
          .map((str, i) => {
              if (i === 0) return str;
              return ` `.repeat(TAB_SPACES * 3) + str;
          })
          .join("\n")}  
    </div>
    <script src="index.js"></script>
  </body>
</html>
`.slice(1);
};
export default htmlSkeleton;
