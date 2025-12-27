// Cost Comparison Animation
document.addEventListener('DOMContentLoaded', function() {
  // Add this to your existing DOMContentLoaded event handler in script.js
  
  // Function to animate number counting
  function animateNumberCounting() {
    const costTable = document.querySelector('.cost-comparison-table');
    
    if (costTable) {
      // Check if the table is in the viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Get all number cells to animate
            const numberCells = costTable.querySelectorAll('td.in-house, td.outsourced');
            
            numberCells.forEach(cell => {
              // Skip cells that have the X icon
              if (cell.querySelector('.fa-times')) return;
              
              // Get the target number
              const targetText = cell.textContent;
              if (!targetText.includes('£')) return;
              
              const targetNumber = parseInt(targetText.replace(/[^0-9]/g, ''), 10);
              
              // Set start number
              let currentNumber = 0;
              cell.textContent = '£0';
              
              // Calculate increment
              const duration = 1500; // 1.5 seconds
              const frameDuration = 16; // approx 60fps
              const totalFrames = duration / frameDuration;
              const increment = targetNumber / totalFrames;
              
              // Start animation
              const animation = setInterval(() => {
                currentNumber += increment;
                
                if (currentNumber >= targetNumber) {
                  clearInterval(animation);
                  cell.textContent = targetText; // Set the original text format
                } else {
                  cell.textContent = `£${Math.floor(currentNumber).toLocaleString()}`;
                }
              }, frameDuration);
            });
            
            // Disconnect the observer after triggering animation
            observer.disconnect();
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(costTable);
    }
  }
  
  // Call the function
  animateNumberCounting();
});