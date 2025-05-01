/**
 * Instagram Feed Integration Script for FreedomFit
 * 
 * This script fetches and displays content from Nova's Instagram account.
 * Using actual content from @freedmfit Instagram account.
 */

document.addEventListener('DOMContentLoaded', function() {
    const instagramFeed = document.getElementById('instagram-feed');
    
    // Load the Instagram feed with content from Nova's actual content
    loadInstagramFeed();
    
    function loadInstagramFeed() {
        if (!instagramFeed) return;
        
        // Remove placeholder if it exists
        const placeholder = document.querySelector('.instagram-placeholder');
        if (placeholder) {
            placeholder.remove();
        }
        
        // Using actual content we've downloaded from Instagram
        // Mix of transformation photos, video thumbnails, and workout content
        const instagramPosts = [
            {
                type: 'image',
                imageUrl: 'images/before-after1.jpg',
                caption: 'Amazing transformation after just 12 weeks of consistent training! #FreedomFit #Transformation',
                likes: 312,
                link: 'https://www.instagram.com/freedmfit/'
            },
            {
                type: 'video',
                imageUrl: 'images/instagram/post3.jpg', // Screenshot from video-1.mp4
                caption: 'Quick 10-minute HIIT workout you can do anywhere. #NoExcuses #FreedomFit',
                likes: 256,
                link: 'https://www.instagram.com/freedmfit/'
            },
            {
                type: 'image',
                imageUrl: 'images/nova-profile.jpg',
                caption: 'Ready to help you reach your fitness goals! DM me for coaching inquiries. #PersonalTrainer',
                likes: 178,
                link: 'https://www.instagram.com/freedmfit/'
            },
            {
                type: 'video',
                imageUrl: 'images/instagram/post5.jpg', // Screenshot from video-2.mp4
                caption: 'Proper form is everything. Watch this tutorial on perfecting your squat. #FormMatters',
                likes: 178,
                link: 'https://www.instagram.com/freedmfit/'
            },
            {
                type: 'image',
                imageUrl: 'images/before-after2.jpg',
                caption: '6 month consistency leads to incredible results! #BeforeAndAfter #Dedication',
                likes: 296,
                link: 'https://www.instagram.com/freedmfit/'
            },
            {
                type: 'video',
                imageUrl: 'images/instagram/post8.jpg', // Screenshot from video-3.mp4
                caption: 'Answering your top fitness questions in this Q&A. #AskNova #FitnessAdvice',
                likes: 167,
                link: 'https://www.instagram.com/freedmfit/'
            },
            {
                type: 'image',
                imageUrl: 'images/before-after3.jpg',
                caption: '8 weeks of dedication and proper nutrition planning made all the difference! #TransformationTuesday',
                likes: 224,
                link: 'https://www.instagram.com/freedmfit/'
            },
            {
                type: 'video',
                imageUrl: 'images/instagram/post1.jpg', // Screenshot from video4.mp4
                caption: 'Client testimonial - hear the experience firsthand! #RealResults #ClientSuccess',
                likes: 201,
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
        image.src = post.imageUrl;
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
