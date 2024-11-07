class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = 3;
    }

    update(width, height) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around the edges instead of bouncing
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }
}

const canvas = document.getElementById('nodeCanvas');
const ctx = canvas.getContext('2d');
const nodes = [];
const maxDistance = 150;
const numNodes = 75;

// Define a virtual space that's larger than the viewport
const virtualSpace = {
    width: 2000,  // Fixed virtual width
    height: 1500  // Fixed virtual height
};

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Only create nodes if they don't exist yet
    if (nodes.length === 0) {
        for (let i = 0; i < numNodes; i++) {
            nodes.push(new Node(
                Math.random() * virtualSpace.width,
                Math.random() * virtualSpace.height
            ));
        }
    }
}

function drawNodes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate the visible area offset
    const offsetX = Math.max(0, (virtualSpace.width - canvas.width) / 2);
    const offsetY = Math.max(0, (virtualSpace.height - canvas.height) / 2);
    
    // Draw connections
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.2)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                const opacity = (1 - distance/maxDistance) * 0.5;
                ctx.strokeStyle = `rgba(100, 100, 100, ${opacity})`;
                
                // Draw only if at least one node is in view
                const x1 = nodes[i].x - offsetX;
                const y1 = nodes[i].y - offsetY;
                const x2 = nodes[j].x - offsetX;
                const y2 = nodes[j].y - offsetY;
                
                if (isInView(x1, y1) || isInView(x2, y2)) {
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                }
            }
        }
    }
    ctx.stroke();

    // Draw nodes
    nodes.forEach(node => {
        const x = node.x - offsetX;
        const y = node.y - offsetY;
        
        if (isInView(x, y)) {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(100, 100, 100, 0.8)';
            ctx.arc(x, y, node.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        node.update(virtualSpace.width, virtualSpace.height);
    });

    requestAnimationFrame(drawNodes);
}

function isInView(x, y) {
    return x >= -maxDistance && 
           x <= canvas.width + maxDistance && 
           y >= -maxDistance && 
           y <= canvas.height + maxDistance;
}

// Initialize and start animation
initCanvas();
drawNodes();

// Handle window resize
window.addEventListener('resize', initCanvas);