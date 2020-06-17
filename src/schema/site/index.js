const renderMath = function () {
    const inlineMaths = document.querySelectorAll(".math");
    inlineMaths.forEach((inlineMath) => {
        katex.render(inlineMath.innerHTML, inlineMath, {
            throwOnError: false,
        });
    });
    const alignedMaths = document.querySelectorAll(".aligned");
    alignedMaths.forEach((alignedMath) => {
        katex.render(alignedMath.innerHTML, alignedMath, {
            throwOnError: false,
            displayMode: true,
        });
    });
};

window.onload = renderMath;
