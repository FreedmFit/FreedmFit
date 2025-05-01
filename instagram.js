/**
 * Instagram Feed Integration Script for FreedomFit
 * 
 * This script fetches and displays content from Nova's Instagram account.
 * Since direct Instagram API access requires authentication and approval,
 * this is a simulated version that would be replaced with actual API integration.
 */

document.addEventListener('DOMContentLoaded', function() {
    const instagramFeed = document.getElementById('instagram-feed');
    
    // This would be replaced with actual Instagram API calls
    // For now, we'll simulate with local images
    loadInstagramFeed();
    
    function loadInstagramFeed() {
        if (!instagramFeed) return;
        
        // Remove placeholder if it exists
        const placeholder = document.querySelector('.instagram-placeholder');
        if (placeholder) {
            placeholder.remove();
        }
        
        // In a real implementation, you would fetch from Instagram API
        // For demonstration, we'll use local images that would be saved from Instagram
        const instagramPosts = [
            {
                type: 'image',
                imageUrl: 'images/instagram/post1.jpg',
                caption: 'Morning workout routine to kickstart your metabolism. #FreedomFit #MorningRoutine',
                likes: 124,
                link: 'https://www.instagram.com/freedmfit/'
            },
            {
                type: 'image',
                imageUrl: 'images/instagram/post2.jpg',
                caption: 'Simple nutrition tips for busy professionals. #HealthyEating #FreedomFit',
                likes: 89,
                link: 'https://www.instagram.com/freedmfit/'
            },
            {
                type: 'video',
                thumbnailUrl: 'images/instagram/post3.jpg',
                caption: 'Quick 10-minute HIIT workout you can do anywhere. #NoExcuses #FreedomFit',
                likes: 256,
                link: 'https://www.instagram.com/freedmfit/'
            },
            {
                type: 'image',
                imageUrl: 'images/instagram/post4.jpg',
                caption: 'Client transformation spotlight! 12 weeks of dedication. #Transformation #Results',
                likes: 312,
                link: 'https://www.instagram.com/freedmfit/'
            },
            {
                type: 'video',
                thumbnailUrl: 'images/instagram/post5.jpg',
                caption: 'Proper form is everything. Watch this tutorial on perfecting your squat. #FormMatters',
                likes: 178,
                link: 'https://www.instagram.com/freedmfit/'
            },
            {
                type: 'image',
                imageUrl: 'images/instagram/post6.jpg',
                caption: 'Meal prep Sunday! Setting yourself up for a successful week. #MealPrep #Consistency',
                likes: 145,
                link: 'https://www.instagram.com/freedmfit/'
            },
            {
                type: 'image',
                imageUrl: 'images/instagram/post7.jpg',
                caption: 'Finding your why is the key to staying motivated. What drives you? #Motivation',
                likes: 201,
                link: 'https://www.instagram.com/freedmfit/'
            },
            {
                type: 'video',
                thumbnailUrl: 'images/instagram/post8.jpg',
                caption: 'Answering your top fitness questions in this Q&A. #AskNova #FitnessAdvice',
                likes: 167,
                link: 'https://www.instagram.com/freedmfit/'
            }
        ];
        
        // Display posts in the feed
        instagramPosts.forEach(post => {
            const postElement = createPostElement(post);
            instagramFeed.appendChild(postElement);
        });
    }
    
    function createPostElement(post) {
        const postElement = document.createElement('div');
        postElement.className = 'instagram-item';
        
        const image = document.createElement('img');
        image.src = post.type === 'image' ? post.imageUrl : post.thumbnailUrl;
        image.alt = post.caption.split('.')[0]; // Use first sentence as alt text
        image.loading = 'lazy'; // Enable lazy loading
        
        const overlay = document.createElement('div');
        overlay.className = 'instagram-overlay';
        
        const link = document.createElement('a');
        link.href = post.link;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        const icon = document.createElement('i');
        // Use video icon for videos, camera icon for images
        icon.className = post.type === 'video' ? 'fas fa-play' : 'fas fa-camera';
        
        link.appendChild(icon);
        overlay.appendChild(link);
        
        postElement.appendChild(image);
        postElement.appendChild(overlay);
        
        // Add event listener to show post details on click or hover
        postElement.addEventListener('click', function() {
            window.open(post.link, '_blank');
        });
        
        return postElement;
    }
});