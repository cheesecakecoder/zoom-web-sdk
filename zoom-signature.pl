#!/usr/bin/perl

# Perl implementation documented @
# https://marketplace.zoom.us/docs/sdk/native-sdks/web/essential/signature

use Time::localtime;
use MIME::Base64;
use Digest::SHA qw(hmac_sha256);

my $meeting_id = 'YOUR_MEETING_ID';
my $meeting_pw = 'YOUR_MEETING_PASSWORD';
my $api_key = 'YOUR_API_KEY';
my $api_secret = 'YOUR_API_SECRET';
my $timestamp = time * 1000 - 30000;

my $data = encode_base64($api_key . $meeting_id . $timestamp . '0');
$data =~ s/\n//g;
$data =~ s/\r//g;

my $hash = hmac_sha256($data, $api_secret);
my $sig = $api_key . "." . $meeting_id . "." . $timestamp . ".0." . encode_base64($hash);
$sig =~ s/\n//g;
$sig =~ s/\r//g;

my $sig2 = encode_base64($sig);

$sig2 =~ s/\+/-/g;
$sig2 =~ s/\//_/g;
$sig2 =~ s/=//g;
$sig2 =~ s/\n//g;
$sig2 =~ s/\r//g;
