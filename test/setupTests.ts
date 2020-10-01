import {use} from 'chai'

var chaiAsPromised = require("chai-as-promised");
var chaiIterator = require( 'chai-iterator')
const sinonChai = require("sinon-chai");
import sinonChaiInOrder from 'sinon-chai-in-order';

use(chaiAsPromised);
use(chaiIterator)
use(sinonChai)
use(sinonChaiInOrder)
