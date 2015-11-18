var MAGIC_TLD = 'domainfront';

function munge(front, host) {
  var frontLength = front.split('.').length;
  return [front, host, frontLength, MAGIC_TLD].join('.');
}

function isFront(domain) {
  var end = '.' + MAGIC_TLD;
  return domain.slice(domain.length - end.length) === end;
}

function demunge(domain) {
  if (!isFront(domain)) {
    return domain;
  }
  var parts = domain.split('.');
  var frontLength = parts[parts.length - 2];
  var frontParts = parts.slice(0, frontLength);
  var hostParts = parts.slice(frontLength, parts.length - 2);
  return {
    front: frontParts.join('.'),
    host: hostParts.join('.')
  };
}

exports.munge = munge;
exports.isFront = isFront;
exports.demunge = demunge;
