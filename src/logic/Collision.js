export const Collision = {
    // Circle-Circle Collision
    // circle: {x, y, radius}
    checkCircle: (c1, c2) => {
        const dx = c1.x - c2.x;
        const dy = c1.y - c2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < (c1.radius + c2.radius);
    },

    // Point vs Circle (for mouse clicks if needed, though we use buttons)
    checkPointCircle: (x, y, circle) => {
        const dx = x - circle.x;
        const dy = y - circle.y;
        return Math.sqrt(dx * dx + dy * dy) < circle.radius;
    },

    // Check if entity is off screen (bottom)
    isOffScreenBottom: (entity, canvasHeight) => {
        return (entity.y - entity.radius) > canvasHeight;
    },

    // Check if entity is off screen (top/sides) - for bullets
    isOffScreen: (entity, width, height) => {
        return (
            entity.y < -entity.radius ||
            entity.x < -entity.radius ||
            entity.x > width + entity.radius ||
            entity.y > height + entity.radius
        );
    }
};
