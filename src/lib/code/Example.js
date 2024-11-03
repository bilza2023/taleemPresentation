export default class SlideObject {
    static DEFAULT_VALUES = {
        startTime: 0,
        endTime: 10,
        template: "",
        items: [],
        slideExtra: [],
        extra: {
            backgroundColor: "#FFFFFF",
            canvasWidth: 1000,
            canvasHeight: 360,
            cellHeight: 25,
            cellWidth: 25,
            bgGlobalAlpha: 1,
            xFactor: 0,
            yFactor: 0,
            showGrid: false,
            gridLineWidth: 1,
            gridLineColor: "gray"
        }
    };

    constructor(type, items = [], assets = [], args = {}) {
        if (!type) {
            throw new Error("Type is required for SlideObject");
        }

        this.type = type;
        this.items = Array.isArray(items) ? items : [];
        this.assets = Array.isArray(assets) ? assets : [];
        
        // Optional properties with defaults
        this.startTime = args.startTime ?? SlideObject.DEFAULT_VALUES.startTime;
        this.endTime = args.endTime ?? SlideObject.DEFAULT_VALUES.endTime;
        this.template = args.template ?? SlideObject.DEFAULT_VALUES.template;
        this.slideExtra = args.slideExtra ?? SlideObject.DEFAULT_VALUES.slideExtra;
        this.extra = {
            ...SlideObject.DEFAULT_VALUES.extra,
            ...args.extra
        };
    }

    static fromDatabase(dbData) {
        // Handle MongoDB ObjectId if present
        const mongoId = dbData._id?.$oid;
        
        // Create the slide object
        const slide = new SlideObject(
            dbData.type,
            dbData.items.map(item => ({
                ...item,
                id: item._id?.$oid // Preserve MongoDB ID if present
            })),
            [], // assets array is empty as it's not in the DB structure
            {
                startTime: dbData.startTime,
                endTime: dbData.endTime,
                template: dbData.template,
                slideExtra: dbData.slideExtra,
                extra: dbData.extra
            }
        );

        // Add MongoDB ID if present
        if (mongoId) {
            slide._id = mongoId;
        }

        return slide;
    }

    // Method to convert back to database format
    toDatabase() {
        const dbObject = {
            startTime: this.startTime,
            endTime: this.endTime,
            type: this.type,
            template: this.template,
            items: this.items.map(item => ({
                ...item,
                // Convert id back to MongoDB format if it exists
                _id: item.id ? { $oid: item.id } : undefined
            })),
            slideExtra: this.slideExtra,
            extra: this.extra
        };

        // Add MongoDB ID if present
        if (this._id) {
            dbObject._id = { $oid: this._id };
        }

        return dbObject;
    }

    // Static factory method for creating new instance with defaults
    static createNew(type) {
        return new SlideObject(type);
    }
}

///////////////////////////////////////////////
///////////////////////////////////////////////
