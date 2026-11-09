export function isColliding(rectA, rectB) {
    return (
        rectA.left < rectB.right &&
        rectA.right > rectB.left &&
        rectA.top < rectB.bottom &&
        rectA.bottom > rectB.top
    );
}

export const isCircleCollidingWithRect = (circle, rect) => {
    const closestX = Math.max(
        rect.left,
        Math.min(circle.x, rect.right)
    );

    const closestY = Math.max(
        rect.top,
        Math.min(circle.y, rect.bottom)
    );

    const distanceX = circle.x - closestX;
    const distanceY = circle.y - closestY;

    return (
        distanceX * distanceX + distanceY * distanceY
        <= circle.radius * circle.radius
    );
};