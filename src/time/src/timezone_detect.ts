// Copyright 2023 Geoid
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.




function detectTimeZone () {
    if (typeof Intl !== 'object') {
      return false;
    }
  
    if (typeof Intl.DateTimeFormat !== 'function') {
      return false;
    }
  
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  
    if (timeZone === undefined || timeZone.length === 0) {
      return false;
    }
  
    try {
      // Intl.DateTimeFormat needs to support IANA time zone names
      new Intl.DateTimeFormat('en-US', {
        timeZone: 'Australia/Sydney',
        timeZoneName: 'long'
      }).format();
    } catch (e) {
      return false;
    }
  
    return timeZone;
  }
  
  module.exports = detectTimeZone;