import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        subscriber: {
            type: mongoose.Schema.Types.ObjectId, // ONE WHO IS SUBSCRIBING
            ref: "User",
            required: true,
        },
        channel: {
            type: mongoose.Schema.Types.ObjectId, // ONE  TO WHO IS BEING SUBSCRIBED
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
