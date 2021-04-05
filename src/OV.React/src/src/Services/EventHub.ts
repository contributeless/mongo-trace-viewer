import EventEmitter from 'eventemitter3';
import { EventTypes } from '../models/EventTypes';

const eventEmitter = new EventEmitter();

const EventHub = {
  on: (event: EventTypes, fn: (value: object) => void) => eventEmitter.on(event, fn),
  once: (event: EventTypes, fn: (value: object) => void) => eventEmitter.once(event, fn),
  off: (event: EventTypes, fn?: (value: object) => void) => eventEmitter.off(event, fn),
  emit: (event: EventTypes, payload: object) => eventEmitter.emit(event, payload)
}

Object.freeze(EventHub);

export default EventHub;