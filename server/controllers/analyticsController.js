const fs = require('fs').promises;
const path = require('path');
const logger = require('../config/logger');

exports.getAnalytics = async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads');
    const files = await fs.readdir(uploadsDir);
    
    // Get all compressed images
    const compressedImages = files.filter(file => file.startsWith('compressed-'));
    
    // Calculate analytics
    let totalImages = compressedImages.length;
    let totalSize = 0;
    
    for (const filename of compressedImages) {
      const filePath = path.join(uploadsDir, filename);
      const stats = await fs.stat(filePath);
      totalSize += stats.size;
    }

    // Get recent activity (last 10 images)
    const recentActivity = await Promise.all(
      compressedImages.slice(0, 10).map(async (filename) => {
        const filePath = path.join(uploadsDir, filename);
        const stats = await fs.stat(filePath);
        return {
          filename,
          createdAt: stats.birthtime,
          size: stats.size
        };
      })
    );

    res.json({
      success: true,
      data: {
        summary: {
          totalImages,
          totalSize,
          averageSize: totalImages > 0 ? totalSize / totalImages : 0
        },
        recentActivity
      }
    });
  } catch (error) {
    logger.error('Error in getAnalytics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics',
      error: error.message
    });
  }
}; 