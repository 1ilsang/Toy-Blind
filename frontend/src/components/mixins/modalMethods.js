import {EventBus} from "../../utils/event-bus";

export const modalMethods = {
    methods: {
        openModal(value) {
            EventBus.$emit('openModal', value);
        },
        closeModal() {
            EventBus.$emit('closeModal');
        }
    }
};
